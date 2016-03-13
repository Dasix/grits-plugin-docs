#!/bin/bash

cd /project/test/fixtures/basic
grits -v \
	-W -S -P 3555 \
	--plugin "grits-plugin-docs" \
	.
