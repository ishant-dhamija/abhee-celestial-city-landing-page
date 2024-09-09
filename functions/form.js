import { MongoClient } from "mongodb";

let client = null;

const connectToDatabase = async () => {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
  }
  return client.db(process.env.MONGO_DB_NAME);
};

export const handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ success: false, message: "Invalid request" }),
      };
    }

    // Parse the request body
    // const { name, contact, category } = JSON.parse(event.body);

    const formData = new URLSearchParams(event.body);
    const name = formData.get("name");
    const contact = formData.get("contact");
    const category = formData.get("category");

    // Validate the required fields
    if (!name || !contact || !category) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: "Name, contact number, and category are required",
        }),
      };
    }

    // Connect to MongoDB
    const db = await connectToDatabase();
    const collection = db.collection("abhee-celestial-city-leads"); // Replace with your collection name

    // Insert the data into the MongoDB collection
    const result = await collection.insertOne({
      name,
      contact,
      category,
      submittedAt: new Date(),
    });

    // Check the insertion result
    if (result.acknowledged) {
      //   return {
      //     statusCode: 200,
      //     body: JSON.stringify({
      //       success: true,
      //       message: "Data saved successfully",
      //     }),
      //   };
      return {
        statusCode: 302,
        headers: {
          Location: "/success.html", // Redirect to the thank you page
        },
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          message: "Failed to save data. Try again!",
        }),
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "Some error occurred while saving details. Try again!",
      }),
    };
  }
};

// export async function handler(event, context) {
//   const db = await connectToDatabase();
//   const leadsCollection = db.collection("abhee_celestial_city");

//   if (event.httpMethod !== "POST") {
//     return {
//       statusCode: 405,
//       body: JSON.stringify({ message: "Method not allowed" }),
//     };
//   }

//   // Parse request body
//   if (!event.body) {
//     return {
//       statusCode: 400,
//       body: JSON.stringify({ message: "Request body is missing" }),
//     };
//   }

//   try {
//     console.log(event.body);
//     const body = JSON.parse(event.body);

//     const { name, mobileNumber, category } = body;

//     if (!name || !mobileNumber || !category) {
//       return {
//         statusCode: 400,
//         body: JSON.stringify({ message: "Missing required fields" }),
//       };
//     }

//     // Data to be saved in MongoDB
//     const user = {
//       name,
//       mobileNumber,
//       category,
//       submittedAt: new Date(),
//     };

//     // Connect to the database and insert the user data
//     await client.connect();
//     const result = await leadsCollection.insertOne(user);

//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         message: "Data saved successfully!",
//         id: result.insertedId,
//       }),
//     };
//   } catch (error) {
//     console.error("Error saving data to MongoDB:", error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ message: "Error saving data" }),
//     };
//   } finally {
//     await client.close(); // Ensure the connection is closed
//   }
// }
