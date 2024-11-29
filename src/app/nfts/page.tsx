"use client";
import { useAccount, useReadContract } from "wagmi";
import nftAbi from "@/abi/NFTMIR";
import { useEffect, useState } from "react";
import NftCardWaiting from "@/components/nft-card/nft-waiting";
import NftCardMinted from "@/components/nft-card/nft-minted";
import Loading from "@/components/loading/loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "./nfts.scss";

export default function NftsPage() {
  const { address: currentAddress } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("loading...");

  const {
    data: userNfts,
    refetch: refetchUserNfts,
  } = useReadContract({
    address: nftAbi.contractAddress,
    abi: nftAbi.abi,
    functionName: "getTokensWithURI",
    args: [currentAddress as `0x${string}`],
  });

  const {
    data: waitingForRedeem,
    refetch: refetchWaitingForRedeem,
  } = useReadContract({
    address: nftAbi.contractAddress,
    abi: nftAbi.abi,
    functionName: "getWaitingForRedeem",
    args: [currentAddress as `0x${string}`],
  });

  const onRedeem = () => {
  };
  const onRedeemSuccess = () => {
    refetchWaitingForRedeem();
    refetchUserNfts();
  };
  const onRedeemError = () => {
  };

  useEffect(() => {
    if (userNfts) {
      console.log("userNfts", userNfts);
    }
  }, [userNfts]);

  return (
    <div className="common-page nfts-page">
      {userNfts && userNfts.length > 0 && (
        <>
          <Card className="nfts-list mb-8">
            <CardHeader>
              <CardTitle>Owned</CardTitle>
              <CardDescription>total {userNfts.length} NFTs</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-4 gap-8">
              {userNfts.map((item: any) => (
                <NftCardMinted key={item.tokenID} data={item} />
              ))}
            </CardContent>
          </Card>
        </>
      )}
      {waitingForRedeem && waitingForRedeem.length > 0 && (
        <>
          <Card className="nfts-list">
            <CardHeader>
              <CardTitle>Waiting For Redeem</CardTitle>
              <CardDescription>
                total {waitingForRedeem.length} waiting for redeem
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-4 gap-8">
              {(waitingForRedeem as any).map((item: any) => (
                <NftCardWaiting
                  key={item}
                  id={`card-${item}`}
                  tokenId={item}
                  onRedeem={onRedeem}
                  onRedeemSuccess={onRedeemSuccess}
                  onRedeemError={onRedeemError}
                />
              ))}
            </CardContent>
          </Card>
        </>
      )}
      <Loading loading={isLoading} loadingText={loadingText} />
    </div>
  );
}
