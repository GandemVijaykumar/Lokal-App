export const decodeUnicode = (text) => {
  try {
    // Remove invalid Unicode characters (U+0000 to U+001F)
    const sanitizedText = (text || '').replace(/[\u0000-\u001F]/g, '');
    return decodeURIComponent(JSON.parse(`"${sanitizedText}"`));
  } catch (error) {
    console.error('Error decoding Unicode:', error);
    return text || ''; // Return original text or empty string if decoding fails
  }
};

const parseContent = (job) => {
  try {
    job.parsedContent = JSON.parse(job.content || '{}');
  } catch (error) {
    console.error('Error parsing content:', error);
    job.parsedContent = {};
  }
  return job;
};

const extractContentV3 = (job) => {
  const v3Map = {};
  job.contentV3?.V3?.forEach((item) => {
    v3Map[item.field_key] = decodeUnicode(item.field_value || '');
  });
  return v3Map;
};

export const processJobs = (jobs) => {
  return jobs.map((job, index) => {
    // Ensure primary_details exists
    const primaryDetails = job.primary_details || {};

    // Decode Unicode characters in primary_details
    const place = decodeUnicode(primaryDetails.Place || 'N/A');
    const salary = decodeUnicode(primaryDetails.Salary || 'N/A');
    const jobType = decodeUnicode(primaryDetails.Job_Type || 'N/A');
    const experience = decodeUnicode(primaryDetails.Experience || 'N/A');

    // Parse the content field
    const parsedJob = parseContent(job);

    // Extract contentV3 details
    const contentV3Details = extractContentV3(parsedJob);

    return {
      id: job.id || `fallback-id-${index}`, // Fallback ID
      title: decodeUnicode(job.title),
      location: place,
      salary: salary,
      jobType: jobType,
      experience: experience,
      category: contentV3Details['Job Category'] || 'N/A',
      description: decodeUnicode(parsedJob.parsedContent.block1 || ''),
      details: decodeUnicode(parsedJob.parsedContent.block2 || ''),
      customLink: job.custom_link || '',
      tags: job.job_tags?.map((tag) => decodeUnicode(tag.value)) || [],
      gender: contentV3Details['Gender'] || 'N/A',
      shiftTiming: contentV3Details['Shift timing'] || 'N/A',
      otherDetails: decodeUnicode(contentV3Details['Other details'] || ''),
    };
  });
};