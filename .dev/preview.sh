#!/bin/bash

clear

echo "██████╗ ██████╗ ███████╗██╗   ██╗██╗███████╗██╗    ██╗"
echo "██╔══██╗██╔══██╗██╔════╝██║   ██║██║██╔════╝██║    ██║"
echo "██████╔╝██████╔╝█████╗  ██║   ██║██║█████╗  ██║ █╗ ██║"
echo "██╔═══╝ ██╔══██╗██╔══╝  ╚██╗ ██╔╝██║██╔══╝  ██║███╗██║"
echo "██║     ██║  ██║███████╗ ╚████╔╝ ██║███████╗╚███╔███╔╝"
echo "╚═╝     ╚═╝  ╚═╝╚══════╝  ╚═══╝  ╚═╝╚══════╝ ╚══╝╚══╝"
echo "Beta"
echo ""
echo "Welcome to Preview by FT Games!"
echo ""

echo "Enter port for preview to be hosted on (e.g. 8080):"
read port

echo ""
echo "Server will start on port $port."
echo "You should see a notification in your code editor."
echo "Press Ctrl+C to stop the server."
echo ""

npx http-server -p "$port"
