import type { NextFunction, Request, Response } from 'express';
import { ECSClient, RunTaskCommand } from '@aws-sdk/client-ecs';

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
  });
  const data = await ecs.send(taskCommand);

  res.locals.message = data;

  next();
};
