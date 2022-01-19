import { EstateOwnerAuthGuard } from "./estate-owner-auth-guard";

describe('EstateOwnerAuthGuard', () => {
  it('should create an instance', () => {
    expect(new EstateOwnerAuthGuard()).toBeTruthy();
  });
});
