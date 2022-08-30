import { useForm, SubmitHandler } from 'react-hook-form';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { database } from '../../firebaseConfig.js';
import Geocode from 'react-geocode';
import GMap from '../../components/GMap';
import * as React from 'react';

type Inputs = {
  username: string;
  city: string;
  message: string;
};

interface ILocation {
  _id: string;
  pos: {
    lat: string;
    lng: string;
  };
}
[];

const dbInstance = collection(database, `baba_gift_bags`);
// Geocode.setApiKey(process.env.GOOGLEAPI);
// Get address from latitude & longitude.

export default function Home() {
  const [geoAddress, setGeoAdress] = React.useState({ lat: null, lng: null });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const [locationData, setLocationData] = React.useState<ILocation>();

  const getDoc = async () => {
    getDocs(dbInstance).then((data) => {
      data.docs.map((item) => {
        setLocationData({ ...item.data() }._id);
      });
    });
  };

  console.log(`locationData: `, locationData);

  const insert = async ({ ...data }: Inputs) => {
    // Get latitude & longitude from address.
    // Geocode.fromAddress(data.city).then(
    //   (response) => {
    //     const { lat, lng } = response.results[0].geometry.location;
    //     console.log(lat, lng);
    //     setGeoAdress({ lat, lng })
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );
    // addDoc(dbInstance, {
    //   _id: data.username,
    //   pos: geoAddress
    // })
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // insert(data);
  };

  return (
    <div>
      <div className="py-12 bg-white text-black">
        <div className="mt-5 md:mt-0 md:col-span-2 mx-auto  w-1/2 flex justify-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Username
                    </label>
                    <input
                      defaultValue=""
                      {...register(`username`)}
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="given-name"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <input
                      defaultValue=""
                      {...register(`city`)}
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="given-name"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Note
                    </label>
                    <input
                      defaultValue=""
                      {...register(`message`)}
                      type="text"
                      name="message"
                      id="message"
                      autoComplete="given-name"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
                <button
                  onClick={getDoc}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Report
                </button>
              </div>
            </div>
          </form>
        </div>

        <div>
          <GMap />
        </div>
      </div>
    </div>
  );
}
