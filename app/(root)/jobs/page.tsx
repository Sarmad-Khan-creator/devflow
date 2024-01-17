import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import React from "react";
import Filter from "@/components/shared/Filter";
import { SearchParamsProps } from "@/types";
import { countries } from "@/lib/actions/countries.action";
import { fetchJobs } from "@/lib/actions/jobs.action";
import JobCard from "@/components/cards/JobCard";

const Jobs = async ({ searchParams }: SearchParamsProps) => {
  const countires = await countries();

  let countriesFilter: any = [];

  countires.map((item: any) => {
    countriesFilter.push({
      name: item.name.common.split(" ", 2),
      value: item.name.common.toLowerCase(),
    });
  });

  const jobs = await fetchJobs(searchParams.filter, searchParams.q);

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Jobs</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={countriesFilter}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        {jobs.map((item: any) => (
          <JobCard
            key={item.job_id}
            employer_logo={item.employer_logo}
            job_title={item.job_title}
            job_city={item.job_city}
            job_state={item.job_state}
            job_country={item.job_country}
            job_description={item.job_description}
            job_employment_type={item.job_employment_type}
            job_min_salary={item.job_min_salary}
            job_salary_currency={item.job_salary_currency}
            apply_ink={item.job_apply_link}
          />
        ))}
      </div>
    </>
  );
};

export default Jobs;
