"use server";

import Answer from "@/database/answer.model";
import connectToDatabase from "../mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  GetAnswersParams,
} from "./shared.types";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";
import User from "@/database/user.model";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    const { content, author, question, path } = params;

    const newAnswer = await Answer.create({
      content,
      author,
      question,
    });

    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer },
    });

    // TODO: Add interactions

    revalidatePath(path);
  } catch (error) {
    throw error;
    console.log(error);
  }
}

export async function getAnswer(params: GetAnswersParams) {
  try {
    connectToDatabase();

    const { questionId } = params;
    const answers = await Answer.find({ question: JSON.parse(questionId) })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId picture name",
      })
      .sort({ createdAt: -1 });

    return { answers };
  } catch (error) {
    throw error;
    console.log(error);
  }
}

export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();
    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};

    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Question not found");
    }

    revalidatePath(path);
  } catch (error) {
    throw error;
    console.log(error);
  }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();
    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};

    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: JSON.parse(userId) } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: JSON.parse(userId) } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Question not found");
    }

    revalidatePath(path);
  } catch (error) {
    throw error;
    console.log(error);
  }
}
