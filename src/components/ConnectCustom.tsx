"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

const ConnectCustom = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            className={`${
              !ready ? "opacity-0 pointer-events-none select-none" : ""
            }`}
            aria-hidden={!ready}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl text-sm sm:text-base font-semibold cursor-pointer shadow-md transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="bg-red-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl text-sm sm:text-base font-semibold cursor-pointer shadow-md transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Wrong Network
                  </button>
                );
              }

              return (
                <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="bg-indigo-100 text-indigo-600 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer flex items-center gap-1.5 sm:gap-2 shadow-md transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-0.5"
                  >
                    {chain.hasIcon && (
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full overflow-hidden">
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl || "/placeholder.svg"}
                            width={20}
                            height={20}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer shadow-md transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-0.5"
                  >
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectCustom;
