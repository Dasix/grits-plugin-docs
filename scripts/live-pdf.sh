#!/bin/bash

cd /project/test/fixtures/basic
grits -v \
	-P 3555 \
	--plugin "grits-plugin-docs" \
	--plugin "grits-plugin-pdf" \
	.

#-W -S -P 3555 \
