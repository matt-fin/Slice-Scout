import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }


  const {
    userId,
    pizzeriaId,
    requestType,
    locationName,
    addressLine1,
    addressLine2,
    city,
    state, 
    country,
    geocode_latitude,
    geocode_longitude
  } = req.body;

  try {
    // Insert into Submissions table
    const { data: submission, error: submissionError } = await supabase
      .from('submissions')
      .insert({
        user_id: userId,
        pizzeria_id: pizzeriaId,
        request_type: requestType,
        submission_status: "Pending",
      })
      .single();

    if (submissionError) {
      console.log("Fail to submit initial submission");
      throw submissionError;
    }
    else{

    // If request type involves location update
      if (requestType === 'update_location') {
        const { data, error } = await supabase.from('update_location')
        .insert({
          submission_id: submission.submission_id,
          location_name: locationName,
          address_line1: addressLine1,
          address_line2: addressLine2,
          city: city,
          state: state, // Defaulted
          country: country, // Defaulted
          geocode_latitude: geocode_latitude, // Placeholder, replace after geocoding
          geocode_longitude: geocode_longitude, // Placeholder
        }).single();

        if (error) {
          console.error('Supabase insertion failed:', error);
          return res.status(500).json({ success: false, message: 'Database insertion failed', error: error.message });
        } error;
    }
  }

    res.status(200).json({ success: true, submission });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
