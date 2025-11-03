import type { CreateReminderDto, UpdateReminderDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { remindersService } from '../services';

const REMINDER_KEY = ['reminders'];

export function useReminders() {
  return useQuery({
    queryKey: REMINDER_KEY,
    queryFn: () => remindersService.getAll(),
  });
}

export function useReminder(id: string) {
  return useQuery({
    queryKey: [...REMINDER_KEY, id],
    queryFn: () => remindersService.getById(id),
    enabled: !!id,
  });
}

export function useCreateReminder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReminderDto) => remindersService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REMINDER_KEY });
    },
  });
}

export function useUpdateReminder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateReminderDto }) =>
      remindersService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REMINDER_KEY });
    },
  });
}

export function useDeleteReminder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => remindersService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REMINDER_KEY });
    },
  });
}
