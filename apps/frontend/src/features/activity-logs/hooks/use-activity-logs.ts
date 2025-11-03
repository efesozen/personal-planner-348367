import type { CreateActivitylogDto, UpdateActivitylogDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { activitylogsService } from '../services';

const ACTIVITYLOG_KEY = ['activitylogs'];

export function useActivitylogs() {
  return useQuery({
    queryKey: ACTIVITYLOG_KEY,
    queryFn: () => activitylogsService.getAll(),
  });
}

export function useActivitylog(id: string) {
  return useQuery({
    queryKey: [...ACTIVITYLOG_KEY, id],
    queryFn: () => activitylogsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateActivitylog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateActivitylogDto) => activitylogsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACTIVITYLOG_KEY });
    },
  });
}

export function useUpdateActivitylog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateActivitylogDto }) =>
      activitylogsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACTIVITYLOG_KEY });
    },
  });
}

export function useDeleteActivitylog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => activitylogsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACTIVITYLOG_KEY });
    },
  });
}
