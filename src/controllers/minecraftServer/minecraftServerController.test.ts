import {
  DescribeNetworkInterfacesCommand,
  EC2Client,
} from '@aws-sdk/client-ec2';
import {
  DescribeTasksCommand,
  ECSClient,
  RunTaskCommand,
  StopTaskCommand,
} from '@aws-sdk/client-ecs';
import { mockClient } from 'aws-sdk-client-mock';
import type { Request, Response } from 'express';

import { create, destroy, detail } from './minecraftServerController';

const ecsMock = mockClient(ECSClient);
const ec2Mock = mockClient(EC2Client);

describe('minecraftServerController', () => {
  describe('create function', () => {
    beforeEach(() => {
      ecsMock.reset();
      ecsMock.on(RunTaskCommand).resolves({
        tasks: [{ taskArn: 'arn:aws:ecs:region:accountID:task/taskID' }],
      });
    });

    it('should successfully create a task and pass to next middleware', async () => {
      const req = {} as Request;
      const res = { locals: {} } as Response;
      const next = jest.fn();

      await create(req, res, next);

      expect(res.locals.message).toEqual('taskID');
      expect(next).toHaveBeenCalledWith();
    });
  });

  describe('detail function', () => {
    beforeEach(() => {
      ecsMock.reset();
      ec2Mock.reset();

      ecsMock.on(DescribeTasksCommand).resolves({
        tasks: [
          {
            attachments: [
              {
                details: [{ name: 'networkInterfaceId', value: 'eni-123456' }],
              },
            ],
          },
        ],
      });

      ec2Mock.on(DescribeNetworkInterfacesCommand).resolves({
        NetworkInterfaces: [{ Association: { PublicIp: '192.0.2.0' } }],
      });
    });

    it('should retrieve task details and pass to next middleware', async () => {
      const req = { params: { serverId: 'someServerId' } } as Request<{
        serverId: string;
      }>;
      const res = { locals: {} } as Response;
      const next = jest.fn();

      await detail(req, res, next);

      expect(res.locals.message).toEqual(
        expect.objectContaining({ publicIp: '192.0.2.0' }),
      );
      expect(next).toHaveBeenCalledWith();
    });
  });

  describe('destroy function', () => {
    beforeEach(() => {
      ecsMock.reset();
      ecsMock.on(StopTaskCommand).resolves({
        $metadata: { httpStatusCode: 200 },
      });
    });

    it('should stop a task and pass to next middleware', async () => {
      const req = { params: { serverId: 'someServerId' } } as Request<{
        serverId: string;
      }>;
      const res = { locals: {} } as Response;
      const next = jest.fn();

      await destroy(req, res, next);

      expect(res.locals.message).toEqual('Stopping someServerId');
      expect(next).toHaveBeenCalledWith();
    });
  });
});
