import { describe, expect, it } from "vitest";
import { Cl } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const deployer = accounts.get("deployer")!;

describe("Onchain Guestbook", () => {
  it("signs a guestbook message", () => {
    const result = simnet.callPublicFn(
      "counter",
      "sign-guestbook",
      [Cl.stringAscii("Hello from Stacks!")],
      deployer
    );

    expect(result.result).toBeOk(Cl.uint(1));
  });

  it("stores the message", () => {
    simnet.callPublicFn(
      "counter",
      "sign-guestbook",
      [Cl.stringAscii("Hello from Stacks!")],
      deployer
    );

    const result = simnet.callReadOnlyFn(
      "counter",
      "get-message",
      [Cl.uint(1)],
      deployer
    );

    expect(result.result).toBeSome(
      Cl.tuple({
        sender: Cl.principal(deployer),
        message: Cl.stringAscii("Hello from Stacks!"),
      })
    );
  });

  it("tracks the message count", () => {
    simnet.callPublicFn(
      "counter",
      "sign-guestbook",
      [Cl.stringAscii("First message")],
      deployer
    );

    const result = simnet.callReadOnlyFn(
      "counter",
      "get-message-count",
      [],
      deployer
    );

    expect(result.result).toBeOk(Cl.uint(1));
  });
});
