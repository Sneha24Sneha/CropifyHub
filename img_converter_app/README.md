# 🐍 My Python Project

This is a simple Python project with a virtual environment and dependency management using `requirements.txt`.

## 🚀 Features

- Uses a virtual environment to manage dependencies
- Includes a `requirements.txt` file for easy setup
- Example `main.py` that prints a message

---

## 🛠️ Installation

Follow these steps to set up the project on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/my_python_project.git
cd my_python_project
```

### 2. Create a Virtual Environment

Windows:

```bash
python -m venv venv
```

### 2.1 activate virtual Environment

```bash
venv\Scripts\activate
```

Mac/Linux: 

```bash
python3 -m venv venv
source venv/bin/activate
```


### 3. Install Dependencies

```bash
pip install -r requirements.txt
```


### 4. Running the Project

```bash
python main.py
```


### 5. Adding New Dependencies

```bash
pip freeze > requirements.txt
```

### 6. Deactivating the Virtual Environment

```bash
deactivate
```

## Install Multiple Python Versions

### Confirm Installed Versions

```bash
py -0
```

### Note: 

You should see something like:

Installed Pythons found by py Launcher:
 - 3.14-64 *
 - 3.12-64
 - 3.11-64

The * means the default version when you type py.


### Create Virtual Environments for Each Version

## To work on a project with Python 3.12:

```bash
cd your-project-folder
py -3.12 -m venv venv312
venv312\Scripts\activate
```


### To work on the same project with Python 3.14:


```bash
cd your-project-folder
py -3.14 -m venv venv314
venv314\Scripts\activate
```


| Action                         | Command                    |
| ------------------------------ | -------------------------- |
| List installed Python versions | `py -0`                    |
| Create venv for Python 3.11    | `py -3.11 -m venv venv311` |
| Activate venv                  | `venv311\Scripts\activate` |
| Deactivate venv                | `deactivate`               |
| Check Python version in venv   | `python --version`         |


### In production server

Using Gunicorn (Linux/macOS)

Install:

```bash
pip install gunicorn
```

Run:

```bash
gunicorn -w 4 -b 0.0.0.0:8000 'main:app'
```

🔹 -w 4 = 4 worker processes
🔹 main:app = app object from main.py



