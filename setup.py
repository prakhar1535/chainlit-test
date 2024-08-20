from setuptools import setup, find_packages

setup(
    name="my_backend_package", 
    version="0.1.0",            
    description="Backend part of my project",
    long_description=open("README.md").read(),  
    long_description_content_type="text/markdown",
    url="https://github.com/yourusername/my_project", 
    author="Your Name",
    author_email="your.email@example.com",
    license="MIT",
    packages=find_packages(where='backend'), 
    package_dir={'': 'backend'}, 
    install_requires=[
    ],
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.6', 
)