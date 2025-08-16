"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getSentimentAnalysis } from "@/app/actions";
import { Sparkles, AlertCircle } from "lucide-react";

interface SentimentAnalyzerProps {
  cryptocurrency: string;
}

const initialState = {
  data: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90">
      {pending ? "Analyzing..." : <> <Sparkles className="mr-2 h-4 w-4" /> Analyze Sentiment</>}
    </Button>
  );
}

export default function SentimentAnalyzer({ cryptocurrency }: SentimentAnalyzerProps) {
  const [state, formAction] = useActionState(getSentimentAnalysis, initialState);

  const scoreToPercentage = (score: number) => (score + 1) * 50;

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Market Sentiment</CardTitle>
        <CardDescription>
          Get AI-powered sentiment analysis based on recent news.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <input type="hidden" name="cryptocurrency" value={cryptocurrency} />
          <SubmitButton />
        </form>

        {state.error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Analysis Failed</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}

        {state.data && (
          <div className="mt-4 space-y-4">
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span className="font-medium">Sentiment Score</span>
                <span className="font-mono">{state.data.sentimentScore.toFixed(2)}</span>
              </div>
              <Progress value={scoreToPercentage(state.data.sentimentScore)} className="h-2" />
               <div className="flex justify-between text-xs text-muted-foreground mt-1">
                 <span>Negative</span>
                 <span>Neutral</span>
                 <span>Positive</span>
               </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {state.data.sentimentSummary}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
