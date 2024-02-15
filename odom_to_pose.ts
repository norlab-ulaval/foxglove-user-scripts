import { Input, Message } from "./types";

type PoseStamped = Message<"geometry_msgs/PoseStamped">;

export const inputs = ["/robot1/odom"];
export const output = "/robot1/pose";

export default function script(msg: Input<"/robot1/odom">): PoseStamped {
  return {
    header: msg.message.header,
    pose: msg.message.pose.pose,
  };
}
