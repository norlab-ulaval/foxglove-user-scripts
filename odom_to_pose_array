import { Input, Message } from "./types";

type PoseArray = Message<"geometry_msgs/PoseArray">;

export const inputs = ["/pf/pose/odom"];
export const output = "/robot_path";

let lastPoses: any[] = [];
const MAX_POSES = 50; // Change the value of x here

export default function script(msg: Input<"/pf/pose/odom">): PoseArray {
  lastPoses.push(msg.message.pose.pose);
  if (lastPoses.length > MAX_POSES) {
    lastPoses.shift();
  }

  return {
    header: msg.message.header,
    poses: lastPoses,
  };
}
