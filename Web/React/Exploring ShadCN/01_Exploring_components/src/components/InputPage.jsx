// InputPage.jsx
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { Input } from "./ui/input";

const InputPage = () => {
  return (
    // Add h-full here so this div fills the Dashboard space
    <div className="h-full w-full">
      {/* Add h-full to the Card if you want the CARD itself to be giant */}
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>Add Task</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        
        {/* flex-1 pushes the footer to the bottom */}
        <CardContent className="flex-1">
          <Input type={tex}/>
        </CardContent>
        
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InputPage;