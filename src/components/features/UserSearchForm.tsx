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

// The form schema will be in a seperate file, since its only one filed its placed here
const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

type FormValues = z.infer<typeof FormSchema>;

export default function UserSearchForm() {
  const [searchParams, setSearchParams] = useSearchParams();

  const username = searchParams.get('username') ?? '';

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username,
    },
  });

  const onSubmit = (values: FormValues) => {
    // Scenario where I want to preserve existing params while updating username
    // I would use the following approach
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set('username', values.username);
      return newParams;
    });
  };

  const onInputClear = () => {
    //  Scenario to reset all params, the I would use the following approach
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
                {/** NOTE:: In an ideal scenario if a custom component lib is used then "clearing the input feature 'x'" will be
                 * part of the same component, if a component library is used like mantine, mui then
                 * I would create a custom wrapper component to support input clear option.
                 */}
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
                      onClick={(e) => {
                        e.preventDefault();
                        onInputClear();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          onInputClear();
                        }
                      }}
                      variant="ghost"
                      className="absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer focus-visible:ring-0"
                      aria-label="Clear input"
                      type="button"
                      tabIndex={0}
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
