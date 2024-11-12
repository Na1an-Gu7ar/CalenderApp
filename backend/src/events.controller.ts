import { Controller, Get, Post, Put, Delete, Body, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EventsService } from './events.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from './config/multer.config';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  @Get()
  getAllEvents() {
    return this.eventsService.getAllEvents();
  }

  // @Post()
  // createEvent(@Body() eventData: any) {
  //   return this.eventsService.createEvent(eventData);
  // }

  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  createEvent(@Body() eventData: any, @UploadedFile() file: Express.Multer.File) {
    const { title, date } = eventData;

    console.log("Title:", title);
    console.log("Date:", date);

    const parsedDate = Date.parse(date);
    if (isNaN(parsedDate)) {
      throw new Error("Invalid date format");
    }

    const event = {
      title,
      date: new Date(parsedDate).toISOString(),
      filePath: file ? `/uploads/${file.filename}` : null,
    };

    return this.eventsService.createEvent(event);
  }


  // @Put(':id')
  // updateEvent(@Param('id') id: string, @Body() updatedData: any) {
  //   return this.eventsService.updateEvent(id, updatedData);
  // }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  updateEvent(
    @Param('id') id: string,
    @Body() updatedData: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { title, date } = updatedData;

    console.log("Updated Title:", title);
    console.log("Updated Date:", date);

    const parsedDate = Date.parse(date);
    if (isNaN(parsedDate)) {
      throw new Error("Invalid date format");
    }

    const updatedEvent = {
      title,
      date: new Date(parsedDate).toISOString(),
      filePath: file ? `/uploads/${file.filename}` : null,
    };

    return this.eventsService.updateEvent(id, updatedEvent);
  }


  @Delete(':id')
  deleteEvent(@Param('id') id: string) {
    return this.eventsService.deleteEvent(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { message: 'No file uploaded' };
    }
    return {
      message: 'File uploaded successfully',
      filePath: `/uploads/${file.filename}`,
    };
  }
}