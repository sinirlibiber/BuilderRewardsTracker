'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, Clock, Gift } from 'lucide-react';

export function ProgramInfo() {
  return (
    <Card className="bg-white dark:bg-gray-950 border-2 border-black dark:border-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-black dark:text-white">
          <Award className="h-5 w-5" />
          Reward Programs Overview
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Understand how to qualify for builder rewards on Base and Celo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="base" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="base">Base Rewards</TabsTrigger>
            <TabsTrigger value="celo">Celo Rewards</TabsTrigger>
          </TabsList>

          <TabsContent value="base" className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-black dark:text-white mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Weekly Distributions</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Rewards are distributed every week to eligible builders
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Gift className="h-5 w-5 text-black dark:text-white mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Requirements</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                    <li>Integrate WalletConnect or Reown AppKit in your app</li>
                    <li>Deploy and verify at least one contract on Base</li>
                    <li>Contribute to public GitHub repositories</li>
                  </ul>
                </div>
              </div>

              <div className="p-3 bg-gray-100 dark:bg-gray-800 border-2 border-black dark:border-white rounded-lg">
                <p className="text-xs text-black dark:text-white">
                  💡 <strong>Pro Tip:</strong> The more you ship and contribute, the higher your
                  reward allocation!
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="celo" className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-black dark:text-white mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Monthly Distributions</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Rewards are distributed monthly through the Proof of Ship program
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Gift className="h-5 w-5 text-black dark:text-white mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Requirements</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                    <li>Deploy and verify contracts on Celo network</li>
                    <li>Active contributions to public GitHub repositories</li>
                    <li>Demonstrate meaningful project development</li>
                  </ul>
                </div>
              </div>

              <div className="p-3 bg-gray-100 dark:bg-gray-800 border-2 border-black dark:border-white rounded-lg">
                <p className="text-xs text-black dark:text-white">
                  💡 <strong>Pro Tip:</strong> Focus on shipping quality projects with real
                  utility to maximize your rewards!
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
