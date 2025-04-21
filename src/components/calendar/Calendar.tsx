
import { useState } from 'react';
import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { CalendarEvent, mockEvents } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedEvents, setSelectedEvents] = useState<CalendarEvent[]>([]);

  // Find events for the selected date
  const findEventsForDate = (date: Date | undefined) => {
    if (!date) return [];
    
    return mockEvents.filter((event) => {
      const eventDate = new Date(event.startDate);
      return (
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
      );
    });
  };

  // Handle date change
  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      setSelectedEvents(findEventsForDate(newDate));
    } else {
      setSelectedEvents([]);
    }
  };

  // Function to get highlighted dates for the calendar
  const getHighlightedDates = () => {
    const dates: Date[] = [];
    
    mockEvents.forEach((event) => {
      dates.push(new Date(event.startDate));
    });
    
    return dates;
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Calendar */}
      <Card className="w-full md:w-auto shadow-mac">
        <CardHeader>
          <CardTitle>Calendário</CardTitle>
        </CardHeader>
        <CardContent>
          <CalendarUI
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            locale={ptBR}
            className="rounded-md border p-3"
            modifiers={{
              highlighted: getHighlightedDates(),
            }}
            modifiersStyles={{
              highlighted: {
                fontWeight: 'bold',
                backgroundColor: 'rgba(155, 135, 245, 0.1)',
                color: '#7E69AB',
              },
            }}
          />
        </CardContent>
      </Card>

      {/* Events for selected date */}
      <Card className="flex-1 shadow-mac">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {date ? (
              format(date, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })
            ) : (
              'Selecione uma data'
            )}
          </CardTitle>
          {selectedEvents.length > 0 && (
            <Badge variant="outline">
              {selectedEvents.length} evento{selectedEvents.length !== 1 ? 's' : ''}
            </Badge>
          )}
        </CardHeader>
        <CardContent>
          {selectedEvents.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p className="text-lg font-medium">Sem eventos para esta data</p>
              <p className="text-sm">Selecione outra data ou adicione um novo evento</p>
            </div>
          ) : (
            <div className="space-y-4">
              {selectedEvents.map((event) => (
                <div 
                  key={event.id} 
                  className="p-4 rounded-lg border border-l-4"
                  style={{ borderLeftColor: event.color || '#9b87f5' }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{event.title}</h3>
                      {event.description && (
                        <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {event.allDay ? (
                      <span>Dia inteiro</span>
                    ) : (
                      <span>
                        {format(event.startDate, 'HH:mm')} - {format(event.endDate, 'HH:mm')}
                      </span>
                    )}
                    {event.location && (
                      <span className="ml-3">| {event.location}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Calendar;
