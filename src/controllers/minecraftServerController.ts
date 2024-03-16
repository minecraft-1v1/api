import {
  DescribeTasksCommand,
  ECSClient,
  RunTaskCommand,
  type KeyValuePair,
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
    res.locals.message = 'Internal Error';
  } else {
    const { taskArn } = response.tasks[0];
    const taskId = taskArn?.split('/').pop() as string;
    res.locals.message = taskId;
  }
  next();
};

export const describe = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  // Validate if task is running (if stopped, the ip is not valid)
  const ecs = new ECSClient();
  const describeCommand = new DescribeTasksCommand({
    cluster: process.env.CLUSTER_NAME,
    tasks: [req.params.serverId],
  });
  const response = await ecs.send(describeCommand);

  if (response.tasks === undefined) {
    res.locals.message = 'Server is not up or does not exist.';
    next();
  } else if (response.tasks[0].attachments !== undefined) {
    const attachments = response.tasks[0]!.attachments[0]!
      .details as KeyValuePair[];

    let networkInterface = '';

    for (let i = 0; i < attachments?.length; i += 1) {
      if (attachments[i].name === 'networkInterfaceId') {
        networkInterface = attachments[i].value!;
      }
    }
    res.locals.message = networkInterface;
    next();
    // Use https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/ec2/command/DescribeNetworkInterfacesCommand/ to get Public IP
  }
};
