#!/bin/bash

# Execute the runners and watchers

echo ""
echo "[Provision-Local] Building the project"
echo ""
cd /project
grunt docs

echo ""
echo "[Provision-Local] Starting the Watchers"
echo ""
npm run-script watchers-start

echo ""
echo "[Provision-Local] Starting the Local Doc Server"
echo ""
npm run-script server-start

echo ""
echo ""
echo "-------------------------------------------------------------------------"
echo ""
echo "        A local LiveReloadX webserver has been setup and should"
echo "        be available at: http://localhost:3550/"
echo ""
echo "-------------------------------------------------------------------------"
echo ""
echo ""
