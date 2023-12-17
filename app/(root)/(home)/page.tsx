import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import Filter from "@/components/shared/Filter";
import { HomePageFilters } from "@/constants/filters";
import HomeFilters from "@/components/home/HomeFilters";
import NoResult from "@/components/shared/NoResult";
import QuestionCards from "@/components/cards/QuestionCard";

const questions = [
  {
    _id: "1",
    title: "Cascading deletes in SQLAlchemy?",
    tags: [
      { _id: "1", name: "python" },
      { _id: "2", name: "sql" },
    ],
    author: {
      _id: "author1",
      name: "John Doe",
      picture: "url_to_picture",
    },
    upvotes: ["10"],
    views: 100,
    answers: [
      { answerId: "ans1", content: "Answer 1" },
      { answerId: "ans2", content: "Answer 2" },
    ],
    createdAt: new Date("2021-09-01T12:00:00.000Z"),
  },
  {
    _id: "2",
    title: "How to center a div?",
    tags: [
      { _id: "3", name: "css" },
      { _id: "4", name: "sql" },
    ],
    author: {
      _id: "author2",
      name: "John Doe",
      picture: "url_to_another_picture",
    },
    upvotes: ["10"],
    views: 100,
    answers: [
      { answerId: "ans3", content: "Answer 3" },
      { answerId: "ans4", content: "Answer 4" },
    ],
    createdAt: new Date("2021-09-01T12:00:00.000Z"),
  },
  {
    _id: "3",
    title: "Cascading deletes in SQLAlchemy?",
    tags: [
      { _id: "5", name: "python" },
      { _id: "6", name: "sql" },
    ],
    author: {
      _id: "author3",
      name: "John Doe",
      picture: "url_to_third_picture",
    },
    upvotes: ["10"],
    views: 100,
    answers: [
      { answerId: "ans5", content: "Answer 5" },
      { answerId: "ans6", content: "Answer 6" },
    ],
    createdAt: new Date("2021-09-01T12:00:00.000Z"),
  },
];

const Home = () => {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />

      <div className="mt-7 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCards
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There's no questions to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
          discussion. our query could be the next big thing others learn from. Get
          involved! "
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
};

export default Home;
