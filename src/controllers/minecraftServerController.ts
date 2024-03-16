import {
  DescribeNetworkInterfacesCommand,
  EC2Client,
} from '@aws-sdk/client-ec2';
import {
  DescribeTasksCommand,
  ECSClient,
  RunTaskCommand,
} from '@aws-sdk/client-ecs';
import type { NextFunction, Request, Response } from 'express';

import logger from '@/config/logger';

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const ecs = new ECSClient();
  const taskCommand = new RunTaskCommand({
    cluster: process.env.CLUSTER_NAME,
    group: process.env.TASK_GROUP_NAME,
    launchType: 'FARGATE',
    taskDefinition: process.env.TASK_DEFINITION!,
    networkConfiguration: {
      awsvpcConfiguration: {
        subnets: process.env.VPC_SUBNET_IDS!.split(','),
        assignPublicIp: 'ENABLED',
        securityGroups: [process.env.TASK_SECURITY_GROUP_ID!],
      },
    },
  });
  const response = await ecs.send(taskCommand);

  if (response.tasks === undefined) {
    logger.error('It was not possible to create a new ECS Task.');
    logger.info(response);

    return next('Internal Error');
  }

  const { taskArn } = response.tasks[0];
  const taskId = taskArn?.split('/').pop() as string;
  res.locals.message = taskId;

  return next();
};

export const detail = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const ecs = new ECSClient();
  const describeCommand = new DescribeTasksCommand({
    cluster: process.env.CLUSTER_NAME,
    tasks: [req.params.serverId],
  });
  const response = await ecs.send(describeCommand);

  if (!response.tasks) {
    res.locals.status = 404;

    return next({ message: 'Task not found' });
  }

  if (response.tasks[0].lastStatus === 'STOPPED') {
    res.locals.status = 404;

    return next({ message: 'Task is STOPPED' });
  }

  const attachments = response.tasks[0].attachments?.[0].details;

  if (!attachments) {
    return next({ message: 'Server is not up or does not exist.' });
  }

  const networkInterfaceId = attachments.find(
    (attachment) => attachment.name === 'networkInterfaceId',
  );

  const networkInterface = networkInterfaceId?.value;

  if (!networkInterface) {
    res.locals.status = 404;

    return next({ message: 'Attachment not found' });
  }

  const client = new EC2Client();
  const command = new DescribeNetworkInterfacesCommand({
    NetworkInterfaceIds: [networkInterface],
  });
  const taskResponse = await client.send(command);

  const { PublicIp: publicIp } =
    taskResponse?.NetworkInterfaces?.[0].Association ?? {};

  if (!publicIp) {
    res.locals.status = 404;

    return next({ message: 'Public IP not found' });
  }

  res.locals.message = {
    publicIp,
    serverId: req.params.serverId,
  };

  return next();
};
