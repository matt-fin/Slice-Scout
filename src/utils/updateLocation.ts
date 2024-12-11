import { clientConnection } from '@/utils/supabase/server';


const supabase = await clientConnection();

export async function updateLocation(submission: any){

    
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

    const { data: pizzeria, error: fetchError } = await supabase
      .from('test_pizzerias')
      .select('*')
      .eq('pizzeria_id', pizzeriaId)
      .single();

    if(fetchError || !pizzeria) {
        console.log("Pizzeria does not exist");
        return null;
    }

    const { data, error } = await supabase
        .from('test_pizzerias')
        .update({
            pizzeria_name: locationName,
            street_address: streetAddress,
            zip_code: zipCode,
            latitude: lat,
            longitude: lon,
            borough: city,
            building_number: buildingNumber
        }).eq('pizzeria_id', pizzeriaId).select('*').single();

    if(error) {
        console.error('Database error: ', error);
        throw new Error('update failed');
    }

    return data;
}