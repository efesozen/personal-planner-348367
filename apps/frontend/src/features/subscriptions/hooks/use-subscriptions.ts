import type { CreateSubscriptionDto, UpdateSubscriptionDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { subscriptionsService } from '../services';

const SUBSCRIPTION_KEY = ['subscriptions'];

export function useSubscriptions() {
  return useQuery({
    queryKey: SUBSCRIPTION_KEY,
    queryFn: () => subscriptionsService.getAll(),
  });
}

export function useSubscription(id: string) {
  return useQuery({
    queryKey: [...SUBSCRIPTION_KEY, id],
    queryFn: () => subscriptionsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSubscriptionDto) => subscriptionsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUBSCRIPTION_KEY });
    },
  });
}

export function useUpdateSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSubscriptionDto }) =>
      subscriptionsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUBSCRIPTION_KEY });
    },
  });
}

export function useDeleteSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => subscriptionsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUBSCRIPTION_KEY });
    },
  });
}
