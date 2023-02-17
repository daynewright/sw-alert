#!/bin/bash

for i in {1800..1}; do
  printf "\r%02d:%02d" $((i/60)) $((i%60))
  sleep 1
done
