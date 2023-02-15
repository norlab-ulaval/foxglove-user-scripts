// The ./types module provides helper types for your Input events and messages.
import { Input, Message, Point } from "./types";
import { MessageTypeBySchemaName } from "./generatedTypes";

// Your script can output well-known message types, any of your custom message types, or
// complete custom message types.
//
// Use `Message` to access your data source types or well-known types:
// type Twist = Message<"geometry_msgs/Twist">;
//
// Conventionally, it's common to make a _type alias_ for your script's output type
// and use that type name as the return type for your script function.
// Here we've called the type `Output` but you can pick any type name.
type Yaw = {
  data: number;
};

// These are the topics your script "subscribes" to. Studio will invoke your script function
// when any message is received on one of these topics.
export const inputs = ["/icp_odom"];

// Any output your script produces is "published" to this topic. Published messages are only visible within Studio, not to your original data source.
export const output = "/odom/yaw";

function radToDeg(rad: number): number {
  return rad / (Math.PI / 180);
}

// This function is called with messages from your input topics.
// The first argument is an event with the topic, receive time, and message.
// Use the `Input<...>` helper to get the correct event type for your input topic messages.
export default function script(msg: Input<"/icp_odom">): Yaw {
  let twist: MessageTypeBySchemaName["geometry_msgs/Vector3"] =
    msg.message.twist.twist.linear;
  let x: number = twist.x;
  let y: number = twist.y;

  return {
    data: radToDeg(Math.atan2(y, x)),
  };
}
