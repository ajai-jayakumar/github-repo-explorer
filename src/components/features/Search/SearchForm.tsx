import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { z } from 'zod';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from '@/components/ui';

const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

type FormValues = z.infer<typeof FormSchema>;

export default function SearchForm() {
  const [searchParams, setSearchParams] = useSearchParams();

  const username = searchParams.get('username') ?? '';

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username,
    },
  });

  const onSubmit = (values: FormValues) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set('username', values.username);
      return newParams;
    });
  };

  const onInputClear = () => {
    form.setValue('username', '');
    setSearchParams('');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-10 flex flex-col justify-center gap-5 md:flex-row"
        aria-label="Username search form"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    id="username"
                    placeholder="Enter username"
                    data-test-id="username"
                    className="p-5 pr-10 md:p-6 md:pr-12"
                    aria-label="Username input"
                    aria-invalid={!!form.formState.errors.username}
                    autoFocus
                    tabIndex={0}
                  />
                  {field.value && (
                    <Button
                      onClick={onInputClear}
                      variant="ghost"
                      className="absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer"
                      aria-label="Clear input"
                    >
                      <X className="size-5" />
                    </Button>
                  )}
                </div>
              </FormControl>
              <FormMessage role="alert" aria-live="polite" />
            </FormItem>
          )}
        />
        <Button className="w-full cursor-pointer p-6 md:w-sm" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
