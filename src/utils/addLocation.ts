import { clientConnection } from '@/utils/supabase/server';

const supabase = await clientConnection();

export async function addLocation(submission: any) {
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
      } = submission;

  if (!lat || !lon || lat === 0 || lon === 0) {
    return {
      success: false,
      message: 'Invalid latitude or longitude. Please provide valid coordinates.',
    };
  }

  const [buildingNumber, ...streetAddressParts] = addressLine1.split(" ");
  const streetAddress = streetAddressParts.join(" ");

  //updating
  const { data: existingPizzeria, error: fetchError } = await supabase
  .from('test_pizzerias')
  .select('*')
  .or(`pizzeria_name.eq.${locationName},street_address.like.%${streetAddress}%`)
  .single();
  

if (fetchError && fetchError.code !== 'PGRST116') {
  // Handle unexpected errors during fetch
  console.error('Supabase fetch error:', fetchError);
  throw new Error('Error checking for existing pizzeria');
}

if (existingPizzeria) {
  // Pizzeria already exists
  console.log('Pizzeria already exists:', existingPizzeria);
  return {
    success: false,
    message: 'Pizzeria with the same name or address already exists',
    existingPizzeria,
  };
}

const { data: maxIdData, error: maxIdError } = await supabase
.rpc('reset_sequence_if_needed', { table_name: 'test_pizzerias', column_name: 'pizzeria_id' });

if (maxIdError) {
console.error('Failed to reset sequence:', maxIdError);
throw new Error('Error resetting sequence for pizzeria_id');
}

  const { data, error } = await supabase
  .from('test_pizzerias')
  .insert({
    pizzeria_name: locationName,
    open_time: openTime,
    closing_time: closeTime,
    slice_price: 0.0,
    rating: 0.0,
    shop_url: websiteLink,
    reviews_url: reviewsLink,
    phone_num: phoneNumber,
    street_address: streetAddress,
    zip_code: zipCode,
    latitude: lat,
    longitude: lon,
    borough: city,
    building_number: buildingNumber,
  }).select('*').single();

  if (error) {
    console.error('Supabase insertion failed:', error);
    throw new Error('Database insertion failed');
  }

  return {
    success: true,
    message: 'Pizzeria added successfully',
    newPizzeria: data,
    pizzeriaId: data.pizzeria_id
  };

}