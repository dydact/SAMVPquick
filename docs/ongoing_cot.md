# SiteAware Project - Ongoing Chain of Thought (CoT) and Trail of Thought (ToT)

## Core Instructions (DO NOT MODIFY)
1. **Continuous Reference and Update of Chain of Thought (CoT):**
   - Always reference the **Chain of Thought (CoT)** document.
   - Update the CoT according to generated logic with each interaction.
   - Maintain a **Trail of Thought (ToT)** that documents your thoughts, reasoning, and changes as they occur.

2. **Project Context Awareness:**
   - Recognize that this is an **AWS Amplify Gen 2 application**.
   - Backend services are mostly established.
   - Reference project files for detailed information on **schema definitions** and **authentication configurations**.

3. **Additive Development Approach:**
   - **Always be additive**, never reductive with changes.
   - Avoid removing features or making changes that could break the application in unknown ways.
   - Do not change or remove core functionalities or add new dependencies, elements, files, or extensions unless absolutely necessary.
   - If changes are necessary, **notify and document** the reasons for additions or removals.

4. **Assume the Role of a Gifted Senior Engineer:**
   - When faced with a coding task, either:
     - **Break down the problem** yourself into smaller, logical steps.
     - Or assign specialized sub-agents to assume other roles of the development team.

5. **Logical Problem Solving:**
   - Follow the **Chain of Thought protocol** to ensure logical consistency.
   - Create answers that are **extremely logically sound** and consistent with the overall project base.

6. **Maintain Existing Functionality:**
   - **Preserve all existing functionality** unless explicitly approved for removal.
   - Prioritize additions and improvements over removals.

7. **Regular Documentation Updates:**
   - **Regularly update project documentation**, including CoT and ToT.
   - Leave developer notes in every file you modify or create.
   - Maintain separate text files for:
     - **Notes on changes** (developer notes).
     - **Implementation/user guide** for customers.

8. **Assess Impact on Project Architecture:**
   - Continuously assess how changes impact the overall project architecture.
   - Ensure that additions enhance the project without introducing instability.

9. **Incremental Implementation:**
   - Implement changes **step-by-step**.
   - Regularly check for **application stability** after each change.
   - Avoid large, sweeping changes that could break the application.

10. **Best Coding Practices:**
    - Employ best coding practices, including but not limited to:
      - **Refactoring** code for clarity and efficiency.
      - **Dividing code into reusable modules**.
      - Utilizing **high-level abstraction** where appropriate.
    - **Do not introduce new dependencies** unless absolutely necessary and justified.

## Project-Specific Chain of Thought (CoT)
[This section will be updated with each interaction, reflecting the current state of the project and ongoing decisions]

### Current Status
- Implementing task assignment component into the taskR route page
- Modifying the calendar component for improved usability and data representation

### Recent Decisions
1. Calendar modification:
   - Increase width for better visibility
   - Monthly and yearly views to show color-coded horizontal bars for different services
   - Bars to represent billing, payment, and remittance information per service

### Next Steps
1. Address the import error in TaskAssignment.tsx
2. Implement task assignment component in taskR route page
3. Modify calendar component
4. Update related components and data structures

## Trail of Thought (ToT)
[This section will be updated with each interaction, documenting the reasoning behind decisions and changes]

1. Identified import error in TaskAssignment.tsx
2. Created api.ts file to handle API functions
3. Updated types.ts file to include Task and User interfaces
4. Next: Integrate TaskAssignment component into taskR route page

## Reflection and Self-Improvement
[This section will be used to document insights on how to improve the CoT and ToT process]

- Consider creating a separate file for core instructions to prevent accidental modifications
- Implement a version control system for the CoT and ToT to track changes over time
- Develop a method to cross-reference decisions with specific code changes