"use client";

import { Button } from "@/components/ui/button";
import { LayoutGrid, Loader2Icon } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { chatSession } from "@/config/GoogleAiModel";

const GenerateAiTemplate = ({ setGenerateAIOutput }) => {
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const GenerateFromAI = async () => {
    setLoading(true);
    const PROMPT = `Generate template for editor.js in JSON for ${userInput}`;
    try {
      const result = await chatSession.sendMessage(PROMPT);
      const output = JSON.parse(result.response.text());
      setGenerateAIOutput(output);
    } catch (e) {
      console.error("Error generating AI template:", e);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div>
      <Button variant="outline" className="flex gap-2" onClick={() => setOpen(true)}>
        <LayoutGrid className="w-4 h-4" />
        Generate AI Template
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate AI Template</DialogTitle>
            <DialogDescription>
              <label htmlFor="">What do you want to write in the document?</label>
              <Input
                placeholder="Ex. Project Idea"
                onChange={(event) => setUserInput(event.target.value)}
              />
              <div className="flex justify-end gap-2 mt-5">
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  disabled={!userInput || loading}
                  onClick={GenerateFromAI}
                >
                  {loading ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    "Generate"
                  )}
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GenerateAiTemplate;
