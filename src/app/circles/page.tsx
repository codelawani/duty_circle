import axios from 'axios';

export default async function page() {
  const circleData = await fetchCircle();
  console.log(circleData);
  return <div>circles</div>;
}

const fetchCircle = async () => {
  try {
    const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/circle`);
    return res.data;
  } catch (error: any) {
    console.log(error.response);
  }
};
