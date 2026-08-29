import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
export async function GET(req: NextRequest) {
  const auth=req.headers.get("authorization");
  if(auth!==`Bearer ${process.env.CRON_SECRET}`) return NextResponse.json({error:"Unauthorized"},{status:401});
  const {error}=await supabaseAdmin.from("profesionales").select("id").limit(1);
  if(error) return NextResponse.json({ok:false,error:error.message},{status:500});
  return NextResponse.json({ok:true,ts:new Date().toISOString()});
}
