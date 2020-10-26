# Dockerfile for the CircleCI Image Builder
# This is not the dockerfile for the app

FROM node:14-alpine

# ENV PYENV_ROOT=/home/circleci/.pyenv \
# 	PATH=/home/circleci/.pyenv/shims:/home/circleci/.pyenv/bin:/home/circleci/.poetry/bin:$PATH

RUN apk update && apk add \
		tar \
		ca-certificates \
        python3 \
        py3-pip \
		curl \
		git \
		docker
		# libffi-dev \
		# llvm \
		# make \
		# tk-dev \
		# wget

# Install python
RUN pip3 install --upgrade pip && \
    pip3 install \
        awscli

RUN rm -rf /var/cache/apk/*

	# curl https://pyenv.run | bash && \
	# sudo rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# RUN pyenv install 3.5.10 && pyenv global 3.5.10

# RUN python --version && \
# 	pip --version && \
# 	# This installs pipenv at the latest version, currently 2020.6.2
# 	pip install pipenv wheel

# This installs version poetry at the latest version. poetry is updated about twice a month.
# RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python
