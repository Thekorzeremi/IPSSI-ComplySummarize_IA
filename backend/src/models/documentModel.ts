import { Schema, model, models, Types } from "mongoose";

const documentSchema = new Schema(
    {
        user: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
        },
        fileName: {
            type: String,
            required: true,
        },
        size: {
            type: Number,
            required: true,
            min: 1,
        },
        summary: {
            type: String,
            default: "",
        },
        keyPoints: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const Document = models.Document || model("Document", documentSchema);