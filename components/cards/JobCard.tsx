import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  employer_logo: string;
  job_title: string;
  job_city: string;
  job_state: string;
  job_country: string;
  job_description: string;
  job_employment_type: string;
  job_min_salary: string;
  job_salary_currency: string;
  apply_ink: string;
}

const JobCard = ({
  employer_logo,
  job_title,
  job_city,
  job_state,
  job_country,
  job_description,
  job_employment_type,
  job_min_salary,
  job_salary_currency,
  apply_ink,
}: Props) => {
  return (
    <div className="background-light900_dark200 light-border flex flex-col items-center justify-center rounded-2xl border p-8 max-sm:w-screen">
      <div className="flex gap-4 max-sm:flex-col">
        <div className="flex items-center justify-center w-[80px] h-[70px] p-2 rounded-lg background-light800_dark400">
          <Image
            src={
              employer_logo !== null
                ? employer_logo
                : "/assets/images/site-logo.svg"
            }
            width={70}
            height={70}
            alt="job logo"
            className="justify-self-start"
          />
        </div>

        <div className="w-full flex flex-col gap-3">
          <div className="flex justify-between w-full">
            <h3 className="h3-bold text-dark100_light900 max-sm:line-clamp-1">
              {job_title}
            </h3>
            <div className="background-light800_dark400 px-4 py-1 rounded-2xl max-sm:hidden">
              <p className="text-dark100_light900 paragraph-medium">
                {job_city}, {job_state}, {job_country}
              </p>
            </div>
          </div>
          <div>
            <p className="line-clamp-2 text-dark100_light900 paragraph-medium max-sm:line-clamp-3">
              {job_description}
            </p>
          </div>

          <div className="flex w-full justify-between items-center max-sm:flex-col max-sm:items-start max-sm:gap-4">
            <div className="flex gap-5">
              <div className="flex gap-2 items-center">
                <Image
                  src="/assets/icons/clock-2.svg"
                  width={16}
                  height={16}
                  alt="clock"
                />
                <p className="text-light400_light500">{job_employment_type}</p>
              </div>
              <div className="flex gap-2 items-center">
                <Image
                  src="/assets/icons/currency-dollar-circle.svg"
                  width={16}
                  height={16}
                  alt="dollar sign"
                />
                {job_min_salary !== null ? (
                  <>
                    <p className="text-light400_light500">
                      {job_min_salary}
                      {job_salary_currency}
                    </p>
                  </>
                ) : (
                  <p className="text-light400_light500">Not disclosed</p>
                )}
              </div>
            </div>

            <Link href={apply_ink}>
              <div className="flex gap-2 items-center">
                <p className="text-primary-500 body-medium">View job</p>
                <Image
                  src="assets/icons/arrow-up-right.svg"
                  width={16}
                  height={16}
                  alt="arrow up right"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
