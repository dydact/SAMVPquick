import sys
import subprocess

def run_command(command):
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    output, error = process.communicate()
    return output.decode('utf-8'), error.decode('utf-8')

def create_branch(branch_name):
    output, error = run_command(f"git checkout -b {branch_name}")
    if error:
        print(f"Error creating branch: {error}")
    else:
        print(f"Created and switched to branch: {branch_name}")

def commit_changes(message):
    output, error = run_command(f"git add . && git commit -m '{message}'")
    if error:
        print(f"Error committing changes: {error}")
    else:
        print("Changes committed successfully")

def push_branch(branch_name):
    output, error = run_command(f"git push origin {branch_name}")
    if error:
        print(f"Error pushing branch: {error}")
    else:
        print(f"Branch {branch_name} pushed to remote")

def main():
    if len(sys.argv) < 2:
        print("Usage: python implementation_assistant.py <task_name>")
        sys.exit(1)

    task_name = sys.argv[1]
    branch_name = f"feature/{task_name.replace(' ', '-').lower()}"

    create_branch(branch_name)

    print(f"\nImplementing task: {task_name}")
    print("Make your changes and then run the following commands:")
    print(f"1. python implementation_assistant.py commit '{task_name}'")
    print(f"2. python implementation_assistant.py push {branch_name}")

if __name__ == "__main__":
    if len(sys.argv) == 3 and sys.argv[1] == "commit":
        commit_changes(sys.argv[2])
    elif len(sys.argv) == 3 and sys.argv[1] == "push":
        push_branch(sys.argv[2])
    else:
        main()