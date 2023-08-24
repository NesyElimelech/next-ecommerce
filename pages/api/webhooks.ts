import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import { buffer } from 'micro';
import { NextApiRequest, NextApiResponse } from 'next';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});
const prisma = new PrismaClient();


export default async function handlers(req: NextApiRequest, res: NextApiResponse) {
  
}
