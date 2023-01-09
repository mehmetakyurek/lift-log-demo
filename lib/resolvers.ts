import { createSchema } from "graphql-yoga";
import { ObjectId } from "mongodb";
import { exercises, logs, user } from "./mongo";

export default {
    Query: {
        login: async (_, args,) => {
            return (await user.findOne({ name: args.name, pwd: args.pwd }))?._id;
        },
        exercises: async () => {
            return exercises.find();
        },
        logs: async (_, args) => {
            const a = await (await logs.aggregate([{
                $lookup: {
                    from: "exercises",
                    localField: "exercise",
                    foreignField: "_id",
                    as: "exercise"
                }
            }, { $match: { user: new ObjectId(args.user) } }, { $unwind: '$exercise' }]).toArray())
            return a;
        }
    },
    Mutation: {
        async addUser(parent: unknown, args: { name: string, pwd: string }) {
            return new Promise(async res => {
                try {
                    if (!(await user.findOne({ name: args.name }))) {
                        await user.insertOne({
                            name: args.name,
                            pwd: args.pwd
                        }).then(doc => {
                            res({ code: 201, userId: doc.insertedId });
                        });
                    } else res({ code: 400 });
                } catch (error) {
                    res({ code: 500 });
                }
            })
        },
        async updateLog(_, args: { user: string, exercise: string, weight?: number, set?: number, rep?: number, rpe?: number }) {
            const arg = {
                ...args,
                user: new ObjectId(args.user),
                exercise: new ObjectId(args.exercise)
            }
            
            try {
                await logs.findOneAndUpdate({ exercise: arg.exercise, user: arg.user }, {
                    $set: { ...arg }
                }, { upsert: true });
                return true;
            }
            catch {
                return false;
            }
        }
    }
} as Parameters<(typeof createSchema)>["0"]["resolvers"]