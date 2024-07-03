// import { createClient } from "@supabase/supabase-js";
// import 'dotenv/config';

// const supabaseUrl = "https://cqjgtlncwlfvwiedtrfq.supabase.co";
// const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxamd0bG5jd2xmdndpZWR0cmZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk2MjI1NTIsImV4cCI6MjAzNTE5ODU1Mn0.SF_RQNCRmo7p0smlUIaOkZCO_Zzd2aaWSw3-GptSvAQ";
// const supabase = createClient(supabaseUrl, supabaseKey);

// async function test(){
//     //let { data: users, error } = await supabase.from('user').select('*');
//     console.log("D", await supabase.from('user').select('*'));
// }
// test();
import { PrismaClient, Role} from "@prisma/client";

const prisma = new PrismaClient();

async function getUser() {
  console.log("p", prisma);
  const users = await prisma.user.create({
    data : {
      username:"rsiru37",
      name:"raj",
      role:Role.FREELANCER,
    }
  });
  console.log(users);
}

getUser();