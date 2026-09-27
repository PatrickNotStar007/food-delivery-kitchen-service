import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { db } from './db/db';
import { ticketsTable } from './db/schema';

@Injectable()
export class AppService {
  constructor(
    @Inject('RIDER_SERVICE') private readonly riderClient: ClientProxy,
  ) {}

  async processOrder(data: {
    orderId: string;
    customerName: string;
    item: string;
    quantity: number;
  }) {
    const [ticket] = await db
      .insert(ticketsTable)
      .values({
        orderId: data.orderId,
        customerName: data.customerName,
        item: data.item,
        status: 'recieved',
      })
      .returning();

    console.log(`Ticket saved to kitchen DB. ID: ${ticket.id}`);

    await new Promise((res) => setTimeout(res, 2000));

    this.riderClient.emit('order_ready', {
      orderId: data.orderId,
      customerName: data.customerName,
      item: data.item,
    });

    console.log('Event emitted to the rider_queue (order is ready for pickup)');
  }
}
