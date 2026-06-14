import { getCompanyJobs } from '@/lib/jobs';
import React from 'react';
import { Table, Button, Chip } from "@heroui/react";
// Icon import
import { Eye, Pencil, TrashBin } from "@gravity-ui/icons";

const recruiterJobs = async () => {
  const companyId = "company_123";
  // Database theke data ana hocche
  const jobs = await getCompanyJobs(companyId);

  return (
    <div className="min-h-screen bg-[#0d0d0e] text-neutral-200 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-start">
      {/* Apnar deya image style-er moto main card wrapper */}
      <div className="w-full max-w-5xl bg-[#121214] border border-neutral-800/40 rounded-2xl p-6 sm:p-8 shadow-2xl">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-800/60 pb-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Manage All Jobs</h1>
            <p className="text-xs text-neutral-400">Review, edit, and track your active job listings at a glance.</p>
          </div>
          <div className="text-xs bg-[#1c1c1e] border border-neutral-800/60 px-3.5 py-2 rounded-xl text-neutral-300 font-medium">
            Total Postings: <span className="text-emerald-400 font-semibold">{jobs?.length || 0}</span>
          </div>
        </div>

        {/* Hero UI v3 Table Structure */}
        <Table removeWrapper className="w-full">
          <Table.ScrollContainer className="overflow-hidden">
            <Table.Content aria-label="Recruiter Jobs List" className="min-w-[800px]">
              
              {/* Table Header (Image-er moto minimal dark header) */}
              <Table.Header>
                <Table.Column isRowHeader className="bg-transparent text-neutral-400 font-semibold text-xs uppercase tracking-wider py-4 pl-4 border-b border-neutral-800/60">
                  JOB TITLE
                </Table.Column>
                <Table.Column className="bg-transparent text-neutral-400 font-semibold text-xs uppercase tracking-wider py-4 border-b border-neutral-800/60">
                  JOB TYPE
                </Table.Column>
                <Table.Column className="bg-transparent text-neutral-400 font-semibold text-xs uppercase tracking-wider py-4 border-b border-neutral-800/60">
                  SALARY RANGE
                </Table.Column>
                <Table.Column className="bg-transparent text-neutral-400 font-semibold text-xs uppercase tracking-wider py-4 border-b border-neutral-800/60">
                  STATUS
                </Table.Column>
                <Table.Column className="bg-transparent text-neutral-400 font-semibold text-xs uppercase tracking-wider py-4 text-right pr-6 border-b border-neutral-800/60">
                  ACTIONS
                </Table.Column>
              </Table.Header>

              {/* Table Body - Dynamic Loop logic uniboortito thakbe */}
              <Table.Body>
                {jobs && jobs.length > 0 ? (
                  jobs.map((job) => (
                    <Table.Row 
                      key={job._id?.$oid || job._id} 
                      className="border-b border-neutral-900/40 hover:bg-[#1c1c1e]/50 transition-all duration-200 cursor-pointer group"
                    >
                      {/* 1. Title & Category (High Contrast Text) */}
                      <Table.Cell className="py-5 font-semibold text-sm text-neutral-100 pl-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-[#f4f4f5] font-semibold text-[15px] group-hover:text-blue-400 transition-colors">
                            {job.title}
                          </span>
                          <span className="text-xs text-neutral-500 font-normal uppercase tracking-wider">
                            {job.category}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* 2. Job Type & Location */}
                      <Table.Cell className="py-5 text-sm text-neutral-300">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-medium text-neutral-200">{job.type}</span>
                          <span className="text-xs text-neutral-500">
                            {job.isRemote ? "Fully Remote" : job.location}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* 3. Salary Range */}
                      <Table.Cell className="py-5 text-sm text-neutral-300 font-medium">
                        <span>
                          {Number(job.salaryMin).toLocaleString()} - {Number(job.salaryMax).toLocaleString()}
                        </span>{" "}
                        <span className="text-neutral-500 text-xs font-semibold ml-1">{job.currency}</span>
                      </Table.Cell>

                      {/* 4. Color-coded Status Chip (Image-er moto clean color design) */}
                      <Table.Cell className="py-5">
                        <Chip
                          size="sm"
                          variant="flat"
                          className={
                            job.status === "active" 
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold tracking-wide px-2.5 py-1" 
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[11px] font-semibold tracking-wide px-2.5 py-1"
                          }
                        >
                          {job.status}
                        </Chip>
                      </Table.Cell>

                      {/* 5. Action Buttons */}
                      <Table.Cell className="py-5 text-right pr-4">
                        <div className="inline-flex items-center gap-1">
                          
                          {/* View Details */}
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            aria-label="View Details"
                            className="text-neutral-400 hover:text-white hover:bg-neutral-800 min-w-8 h-8 rounded-lg"
                          >
                            <Eye size={16} />
                          </Button>

                          {/* Edit */}
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            aria-label="Edit Job"
                            className="text-neutral-400 hover:text-blue-400 hover:bg-blue-500/10 min-w-8 h-8 rounded-lg"
                          >
                            <Pencil size={15} />
                          </Button>

                          {/* Delete */}
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            aria-label="Delete Job"
                            className="text-neutral-400 hover:text-red-400 hover:bg-red-500/10 min-w-8 h-8 rounded-lg"
                          >
                            <TrashBin size={15} />
                          </Button>

                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                    <Table.Cell className="text-center py-12 text-neutral-500 text-sm" colSpan={5}>
                      No job listings found for this company.
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>

            </Table.Content>
          </Table.ScrollContainer>
        </Table>

      </div>
    </div>
  );
};

export default recruiterJobs;