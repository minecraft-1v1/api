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
import request from 'supertest';

import app from '../app';

const ecsMock = mockClient(ECSClient);
const ec2Mock = mockClient(EC2Client);

describe('/minecraft-server', () => {
  beforeEach(() => {
    ecsMock.reset();
    ec2Mock.reset();
  });

  describe('POST /', () => {
    beforeEach(() => {
      ecsMock.on(RunTaskCommand).resolves({
        tasks: [{ taskArn: 'arn:aws:ecs:region:accountID:task/taskID' }],
      });
    });

    it('should create a task and return a task ID', async () => {
      const response = await request(app).post('/minecraft-server').expect(200);

      expect(response.body.data).toContain('taskID');
    });
  });

  describe('GET /:serverId', () => {
    beforeEach(() => {
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

    it('should return the public IP for a given server ID', async () => {
      const serverId = 'someServerId';
      const response = await request(app)
        .get(`/minecraft-server/${serverId}`)
        .expect(200);

      expect(response.body.data).toHaveProperty('publicIp', '192.0.2.0');
    });
  });

  describe('DELETE /:serverId', () => {
    beforeEach(() => {
      ecsMock.on(StopTaskCommand).resolves({
        $metadata: { httpStatusCode: 200 },
      });
    });

    it('should stop a task and return a confirmation message', async () => {
      const serverId = 'someServerId';
      const response = await request(app)
        .delete(`/minecraft-server/${serverId}`)
        .expect(200);

      expect(response.body.data).toContain(`Stopping ${serverId}`);
    });
  });
});
