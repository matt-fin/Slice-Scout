import { NextApiRequest, NextApiResponse } from 'next';
import { clientConnection } from '@/utils/supabase/server';
import { updateLocation } from '@/utils/updateLocation';
import { addLocation } from '@/utils/addLocation';

const supabase = await clientConnection();

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
    zipCode,
    phoneNumber,
    websiteLink,
    reviewsLink,
    openTime,
    closeTime,
    lat,
    lon
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
      .select('*')
      .single();
      console.log(userId, pizzeriaId, requestType);

    if (submissionError) {
      console.log("Fail to submit initial submission");
      throw submissionError;
    }
    else{

    // If request type involves location update
      if (requestType === 'Update Location') {
        console.log(lat + ' ' + lon);
        const { data, error } = await supabase.from('update_location')
        .insert({
          submission_id: submission.submission_id,
          location_name: locationName,
          address_line1: addressLine1,
          address_line2: addressLine2,
          city: city,
          geocode_latitude: lat, 
          geocode_longitude: lon,
          zip_code: zipCode,
        }).select('*')
          .single();

        if (error) {
          console.error('Supabase insertion failed:', error);
          return res.status(500).json({ success: false, message: 'Database insertion failed', error: error.message });
        } 
        
        const pizzeria = await updateLocation(req.body);
        if (pizzeria) {
          await supabase
            .from('submissions')
            .update({ submission_status: 'Processed' })
            .eq('submission_id', submission.submission_id);
          return res.status(200).json({ success: true, message: 'Location Updated successfully' });
        }
        else {
          return res.status(400).json({ success: false, message: 'Pizzeria not found or update failed' });
        }
    }

      if (requestType === 'Add Location') {
        console.log(lat + ' ' + lon);
        const { data, error } = await supabase.from('add_location')
        .insert({
          submission_id: submission.submission_id,
          location_name: locationName,
          address_line1: addressLine1,
          address_line2: addressLine2,
          geocode_latitude: lat,
          geocode_longitude: lon,
          phone_num: phoneNumber,
          website_url: websiteLink,
          reviews_url: reviewsLink,
          open_time: openTime,
          closing_time: closeTime,
          city: city,
          zip_code: zipCode,
        }).select('*')
        .single();

        if (error) {
          console.error('Supabase insertion failed:', error);
          return res.status(500).json({ success: false, message: 'Database insertion failed', error: error.message });
        } 

        const newPizzeria = await addLocation(req.body);
        if (newPizzeria) {
          await supabase
            .from('submissions')
            .update({ submission_status: 'Processed', pizzeria_id: pizzeriaId })
            .eq('submission_id', submission.submission_id);
            return res.status(200).json({ success: true, message: 'Location added successfully' });
          } else {
            return res.status(400).json({ success: false, message: 'Failed to add new location' });
        }
      }
    }

    res.status(200).json({ success: true, submission });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
