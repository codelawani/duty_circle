import axios from 'axios';
import TaskItem from '../components/common/taskItem';
import { Button } from '../components/ui/button';
import Link from 'next/link';
import Dev from '../components/dev.component';

async function getFeed() {
  try {
    const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/feed`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export default async function Home() {
 

  return (
    <main>
      <Dev/>
    </main>
  );
}
