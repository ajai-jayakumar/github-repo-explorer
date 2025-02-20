# Project Setup

The application was scaffolded using Vite, and the tasks were completed in a manner similar to real-world project development, from setting up linting rules to structuring project folders and building the application.

# To run the application

### Prerequisite

- Node v20+
- pnpm

1. `pnpm install` to install the dependencies
2. `pnpm run dev` to run the application
3. open http://localhost:5173/ to access the application

You can also view the live demo of this application in https://github-repo-explorer-phi.vercel.app/

# Thought process

1. Setting up rules like Lint, Prettier, and import sorting early helps avoid facing difficulties in setting up best practices later when a lot of code is already written. It also improves the developer experience from the early stage.
2. **Editor Rule:** To maintain consistent code formatting across the team, it’s best to use editor rules.
   - You can enforce strict formatting by adding a `settings.json` file to the project workspace, while personal rules can be kept in the user’s space.
   - If strict rules are not required, you can document the recommended settings in the project README as part of the setup.
3. **Why Tailwind CSS**?
   - When working on a project, I prefer building with a design system since it comes with predefined values and configurations.
   - Unlike traditional CSS, where we use specific properties that can lead to inconsistency, custom handling, and a lack of structure, a design system ensures a more standardized approach.
   - Having a design system also helps streamline both the design and development process, reducing deviations in style properties, leading to less friction bettween the UI/UX & engineering team.
   - In production-grade projects, the most commonly used styling approaches are either **SCSS** or **styled-components**. Personally, I prefer **SCSS** for existing projects, while for new projects built from scratch, I would choose **Tailwind CSS** since it has a structured style declarations.
4. **Why shadcn/ui**
   - Using using a **component library** to quickly build basic components like buttons and inputs while maintaining flexibility for customization. My choice is **shadcn/ui** for this task.
   - Since **shadcn/ui** uses **Tailwind CSS** by default, it further reinforces my decision to use Tailwind in this project.
   - There are many other such libraries and if I use SCSS then I would prefer **Mantine** as the author of the library is very active and has vast variety of pre-built components.
   - The given task has a form, I wanted to showcase the use of **react-hook-form and zod** which are commonly used packages to build a form with validations.
   - shadcn/ui provides a component called `Form` which internally uses the mentioned react-hook-form and zod, this made to me to choose shadcn/ui
5. **Vitest**
   - Used **Vitest** as the primary choice for unit and integration testing over Jest, since it works seamless with Vite ecosystem
   - **React Testing Library** is the preferred choice for testing React components, as it focus on user behaviour & interacts with the elements the way user does.
   - **RTL** has in-built Async handling which is convientent to test features like api request, async operations.
   - For UI components, I have written basic unit tests but not extensive ones, as the nature of this task doesn't require full coverage. If this were a production-grade application, I would cover all possible use cases.
   - Followed best practices to prevent the repeated task of import statments in each test file for **Vitest**, including:
     - Declaring `globals` in _vite.config.ts_.
     - Importing `@testing-library/jest-dom` in _vitest.setup.ts_.
6. **React Router**

   - Preferred library for client-side routing due to its popularity and its flexibility to handle complex navigation in the client side.
   - The library is actively mantiained, and has good amount of resources & broad online community due to its popularity, providing oppertunity of easy learning curve at the same time to seek help when needed.

7. **React Query**
   - An another popular library for handling async state management, especially for API state management.
   - Provides native support for handling api states such as loading, error & success make the process ease over the traditional method of setStates.
   - Automatic caching, background refetching, optimistic updates and much more are provided by the library.
   - The ReactQueryProvider is placed inside a folder called `provider`, this is done to group all the providers in one location.
8. **Zod**

   - Although TypeScript is used for type validation, it has some limitations in certain areas.
   - I prefer using **Zod** as a schema validator in cases where TypeScript is not the right fit, eg. **form validation**.
   - TS run validation during compile time whereas zod does during runtime which provides added advantage for many use cases.
   - Zod can be used for validating form, api response, env configuration, etc.

9. **File and Folder Structure**

   - This is a subjective topic, and there are no fixed rules, guidelines, or formulas to follow—it depends on the use case.
   - The file and folder structure in this task is based on the current state of the features.
   - In general, it's best to create a plan that suits the team, tech stack, and project complexity.

# System Architecture

![System Architecture](./src/assets/system%20architecture.png)

# Technical Decisions

### 1. **State Management for Username Search**

- The state management for **username search** is handled using **URL parameters**.
- The reason for this approach is _simple system_ is an **e-procurement application**, which follows a model similar to **e-commerce**.
- In e-commerce applications, one of the most common and complex use cases is **filters**, which can be managed in different ways.
- I prefer using **URL parameters** as the state manager to handle filters efficiently.
- _**I am happy to discuss my past experience with the strategies we used to solve this use case.**_
- To demonstrate this approach, I have applied the same method to the **GitHub user search feature** in this project.

### 2. **Listing of Users & Repositories**

- When dealing with a large lists, the common practice is to use **pagination**. However, in this task, the layout is designed for **infinite scroll**.
- I would use the **Intersection Observer API** to implement the infinite scroll effect.
- To improve performance, **React Virtualization** could be used on top.
- These optimizations can be implemented in the future if the GitHub user & repositories list becomes large.

### 3. **Files and Folder Structure**

- **This is a subjective topic**. For a small, rapidly changing application, I prefer to keep related files grouped together rather than organizing them strictly by type or category.
- This approach gives me flexibility to quickly understand related files and makes it easier to decouple or remove them when needed.
- In this task, I have grouped files by feature, meaning hooks, components, and test cases are placed in the same folder.
- If a file is reused multiple times, it will be decoupled and moved to a common section such as `lib`, `utils`, or `components`.

### 4. Decision Insights

I have added comments in the code explaining why I used specific syntax and what my approach would be in a production-grade application. Please pay attention to these **NOTES** for a better understanding of the code and logic behind my decisions.
