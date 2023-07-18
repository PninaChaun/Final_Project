import { Test, TestingModule } from '@nestjs/testing';
import { AdminAuthorizationService } from './admin-authorization.service';

describe('AdminAuthorizationService', () => {
  let service: AdminAuthorizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminAuthorizationService],
    }).compile();

    service = module.get<AdminAuthorizationService>(AdminAuthorizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
